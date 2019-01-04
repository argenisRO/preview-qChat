from channels.auth import login, logout
from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from pprint import pprint


class ApplicationConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        if self.scope["user"].is_anonymous:
            print('anon')
            await self.close()
        else:
            print(f"user {self.scope['user'].username} accepted")
            await self.accept()

    async def receive_json(self, context):
        print('received', context)

    async def disconnect(self, code):
        print('disconnected')
