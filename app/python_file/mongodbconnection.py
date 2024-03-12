
from pymongo.mongo_client import MongoClient

uri = "mongodb+srv://ranjith:ranjith9108@bharathexim-m5.9yra6qh.mongodb.net/docMachinedev?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri)

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
    client.close()
except Exception as e:
    print(e)
    
uri = "mongodb+srv://ranjith:ranjith9108@bharathexim-m5.9yra6qh.mongodb.net/docMachinestage?retryWrites=true&w=majority"


# Create a new client and connect to the server
client = MongoClient(uri)

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
    client.close()
except Exception as e:
    print(e)
    
    
uri = "mongodb+srv://ranjith:ranjith9108@bharathexim-m5.9yra6qh.mongodb.net/docMachineLive?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri)

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
    client.close()
except Exception as e:
    print(e)