from django.contrib import admin
from django.views.generic import TemplateView
from django.urls import path, include, re_path
from api_user.views import UserLogout, UserLogin, UserRegister
from knox.views import LoginView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', LoginView.as_view()),
    path('logout/', UserLogout.as_view()),
    path('register/', UserRegister.as_view()),
    re_path('.*', TemplateView.as_view(template_name='index.html'))
]
