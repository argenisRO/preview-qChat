from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from rest_framework.throttling import AnonRateThrottle
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from api_user.models import User
from django.http import Http404
from django.contrib.auth import login, logout
from .serializers import SerializeUserLogin, SerializeUserRegister


class UserRegister(CreateAPIView):
    '''
    Create a new user while handling restrictions
    from the Serializer.
    - No Authentication
    '''
    permission_classes = [AllowAny]
    serializer_class = SerializeUserRegister
    query_set = User.objects.all()


class UserLogin(APIView):
    '''
    Log the user in while handling restrictions
    from the Serializer.
    - Limited by throttling (5 request/hour)
    - No Authentication
    '''
    permission_classes = [AllowAny]
    authentication_classes = [AllowAny]
    serializer_class = SerializeUserLogin
    # throttle_classes = [AnonRateThrottle]

    def post(self, request):
        data = request.data
        serializer = SerializeUserLogin(data=data)

        # Valid Case
        if serializer.is_valid():
            user = serializer.validated_data['user']
            token, created = Token.objects.get_or_create(user=user)
            login(request, user)
            return Response({
                "token": token.key,
            }, status=HTTP_200_OK)

        # Invalid Case
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class UserLogout(APIView):
    '''
    Log the user out
    - Must be Authenticated
    '''

    def post(self, request):
        logout(request)
        request.user.auth_token.delete()
        return Response(status=HTTP_200_OK)
