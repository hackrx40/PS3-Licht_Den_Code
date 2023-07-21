from fastapi import FastAPI, UploadFile, File, HTTPException
from pydantic import BaseModel
import logging
from lightfm import LightFM
from lightfm.data import Dataset
import pandas as pd
from pyngrok import ngrok
from typing import List
import uvicorn
from bs4 import BeautifulSoup
import requests
import uuid
from transformers import pipeline,BertForSequenceClassification,BertTokenizer
import time
import torch
from collections import Counter
from deepface import DeepFace
from fastapi.middleware.cors import CORSMiddleware
import nest_asyncio
import os
from haystack.nodes import TextConverter, PreProcessor, DensePassageRetriever, FARMReader
from haystack.document_stores import FAISSDocumentStore
from haystack.pipelines import ExtractiveQAPipeline
import paddleocr

# LOGGING
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.DEBUG)
file_handler = logging.FileHandler("app.log")
file_handler.setLevel(logging.DEBUG)
formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
console_handler.setFormatter(formatter)
file_handler.setFormatter(formatter)
logger.addHandler(console_handler)
logger.addHandler(file_handler)

app = FastAPI(title="Bajaj HackRx 4.0 Backend")
df=pd.read_excel("WatchlistSampleData.xlsx")
ocr_reader = paddleocr.PaddleOCR(use_gpu=True)
os.remove("faiss_document_store.db") if os.path.exists("faiss_document_store.db") else None
reader = FARMReader(model_name_or_path='deepset/xlm-roberta-large-squad2', use_gpu=True)
document_store = FAISSDocumentStore(faiss_index_factory_str="Flat", return_embedding=True)
quantized_finbert = torch.ao.quantization.quantize_dynamic(BertForSequenceClassification.from_pretrained('yiyanghkust/finbert-tone'),{torch.nn.Linear},dtype=torch.qint8)
tokenizer = BertTokenizer.from_pretrained('yiyanghkust/finbert-tone')
nlp = pipeline("sentiment-analysis",model=quantized_finbert,tokenizer=tokenizer)

#FIRST TIME 
model = LightFM(n=60,random_state=120,no_components=150,loss='warp-kos',learning_schedule='adadelta')
dataset = Dataset()

def train():    
    dataset.fit_partial(users=df['ClientCode'], items=df['Symbol'])
    (interactions, weights) = dataset.build_interactions(((x[0], x[1], 1) for x in df[['ClientCode', 'Symbol']].values))
    model.fit(interactions, epochs=40, num_threads=2)

train()

port=8000
app.add_middleware(
CORSMiddleware,
allow_origins=["*"],
allow_credentials=True,
allow_methods=["*"],
allow_headers=["*"],
)

class FaceResponse(BaseModel):
    prediction: bool

class FaceDetect(BaseModel):
    prediction: str

class QuestionRequest(BaseModel):
    question: str

class QuestionResponse(BaseModel):
    answer: str
    
class data(BaseModel):
    ClientCode: List
    Symbol: List
    
class User(BaseModel):
    user_id: str
    n: int
    watchlist: List    

class predictions(BaseModel):
    recs: List

class SentimentResult(BaseModel):
    sentiment: str

class BankSentiment(BaseModel):
    bank_name: str

def remove(known_image_path,test_image_path):
    os.remove(known_image_path)
    os.remove(test_image_path)       

@app.get("/")
def lmao():
    return "LMAO BRO NICE U ARE SO DUMB"


def meow(bank_name):   
  search_url = f"https://www.google.com/search?q={bank_name}&sxsrf=APwXEdfVzpfAF54BQQ6e0mr5fI2tPeW97A:1680341954287&source=lnms&tbm=nws&sa=X&ved=2ahUKEwie8KTKsYj-AhWkU2wGHatNBAkQ_AUoAnoECAEQBA&biw=1536&bih=754&dpr=1.25"
  headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
  }
  response = requests.get(search_url, headers=headers)
  soup = BeautifulSoup(response.content, "lxml")
  article_links,article_data,article_title = [],[],[]
  links = soup.find_all("a")
  for tag in links:
      href = tag.get("href")    
      if href.startswith('/url?esrc=s&q=&rct=j&sa=U&url=')==True:
        index = href.find("&ved=")
        if index != -1:
            href = href[:index]
        article_links.append(href[30::])  

  for link in article_links:
    response_ = requests.get(link, headers=headers)    
    soup_ = BeautifulSoup(response_.content, "lxml")
    title = soup.find("title")
    article_title.append(title.text)
    meta_tag = soup_.find('meta', attrs={'name': 'description'})
    if meta_tag:
      description = meta_tag.get('content')
      article_data.append(description)      
    else:
      print("No meta tag found for link:", link)
  return article_links,article_data,article_title

@app.post("/sentiment", response_model=SentimentResult)
def analyze_sentiment(request: BankSentiment):
    bank_name = request.bank_name
    x, y, z = meow(bank_name)
    results = nlp(y)
    label_counts = Counter(result['label'] for result in results)
    if label_counts.most_common(1)[0][0] == 'Neutral':
        try:            
            logging.debug(label_counts.most_common(2)[0][0])
            return SentimentResult(sentiment=label_counts.most_common(2)[0][0])
        except:            
            logging.debug(label_counts.most_common(1)[0][0])
            return SentimentResult(sentiment=label_counts.most_common(1)[0][0])
    logging.debug(label_counts.most_common(1)[0][0])
    return SentimentResult(sentiment=label_counts.most_common(1)[0][0])

@app.post("/process_file/")
def process_file(img: UploadFile = File(...)):
    img_path = f"{uuid.uuid4()}.jpg"
    file_path = f"{uuid.uuid4()}.txt"
    with open(img_path, "wb") as known_image_file:
        known_image_file.write(img.file.read())    
    result = ocr_reader.ocr(img_path)
    text = ' '.join([word[1][0] for line in result for word in line])
    with open(file_path, 'w') as f:
        f.write(text)
    converter = TextConverter()
    docs = converter.convert(file_path=file_path, meta=None)
    os.remove(img_path)
    os.remove(file_path)
    preprocessor = PreProcessor(split_by="word", split_length=200, split_overlap=10)
    preprocessed = preprocessor.process(docs)
    document_store.delete_documents()
    document_store.write_documents(preprocessed)    
    return {"Message": "File processed successfully!"}

@app.post("/answer_questions/", response_model=QuestionResponse)
def answer_questions(request: QuestionRequest):
    question = request.question
    retriever = DensePassageRetriever(document_store=document_store)    
    document_store.update_embeddings(retriever)
    pipeline = ExtractiveQAPipeline(reader, retriever)
    result = pipeline.run(query=question, params={"Retriever": {"top_k": 10}, "Reader": {"top_k": 1}})
    logger.debug({"answer": result['answers'][0].answer})    
    return {"answer": result['answers'][0].answer}

@app.post("/face-detect/")
async def face_detect(img: UploadFile = File(...)):    
    img_path = f"{uuid.uuid4()}.jpg"
    with open(img_path, "wb") as known_image_file:
        known_image_file.write(img.file.read())    
    result = DeepFace.extract_faces(img_path,enforce_detection=False)[0].get('confidence')
    logging.debug(result)
    os.remove(img_path)
    if result>5:
        return FaceDetect(prediction="Done!!!")
    else:
        return FaceDetect(prediction="Face could not be detected. Please confirm that the picture is a face photo.")
        
@app.post("/face-match/")
async def face_match(known_face: UploadFile = File(...), test_face: UploadFile = File(...)):
    try:        
        known_image_path = f"{uuid.uuid4()}.jpg"
        test_image_path = f"{uuid.uuid4()}.jpg"
        with open(known_image_path, "wb") as known_image_file:
            known_image_file.write(known_face.file.read())
        with open(test_image_path, "wb") as test_image_file:
            test_image_file.write(test_face.file.read())        
        result = DeepFace.verify(known_image_path, test_image_path, model_name='Facenet512', distance_metric='euclidean_l2').get('verified')
        remove(known_image_path,test_image_path)
        logging.debug(result)
        return FaceResponse(prediction=result)
        
    except Exception as e:        
        remove(known_image_path,test_image_path)
        logging.debug(e)
        if str(e)=='''Face could not be detected. Please confirm that the picture is a face photo or consider to set enforce_detection param to False.''':            
            raise HTTPException(status_code=399, detail="Face could not be detected. Please confirm that the picture is a face photo.")
        else:            
            raise HTTPException(status_code=500, detail=str(e))

@app.post("/dbdedo")
def getuserdata(request: data):    
    global df    
    df=pd.concat([df,pd.DataFrame({"ClientCode":request.ClientCode,"Symbol":request.Symbol})]).reset_index(drop=True).drop_duplicates()    
    return {"Result":"Nice I got the stuff bro"}


@app.post("/cfpredict",response_model=predictions)
def cffm(request: User):    
    global df
    user_id = request.user_id
    missing_items = set(request.watchlist) - set(df['ClientCode']==user_id)
    n_items_to_recommend = request.n    
    if len(missing_items)!=0:        
        new_rows = [{'ClientCode': user_id, 'Symbol': item_id} for item_id in missing_items]
        df=pd.concat([df,pd.DataFrame(new_rows)]).reset_index(drop=True).drop_duplicates()            
        train()
    user_internal_id = dataset.mapping()[0][user_id]
    item_ids = list(dataset.mapping()[2].values())
    recommendations = model.predict(user_ids=user_internal_id, item_ids=item_ids, num_threads=2)
    top_indices = recommendations.argsort()[-n_items_to_recommend:][::-1]
    top_items = [list(dataset.mapping()[2].keys())[list(dataset.mapping()[2].values()).index(idx)] for idx in top_indices]
    return predictions(recs=top_items)

if __name__=="__main__":    
    uvicorn_logger = logging.getLogger("uvicorn")
    uvicorn_logger.handlers = logger.handlers
    ngrok_tunnel = ngrok.connect(port)
    print('Public URL:', ngrok_tunnel.public_url)
    nest_asyncio.apply()    
    uvicorn.run(app,port=port)
    df.to_excel("WatchlistSampleData.xlsx",index=False)
