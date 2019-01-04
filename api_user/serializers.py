from api_user.models import User

from rest_framework.serializers import ModelSerializer, CharField, EmailField, Serializer
from django.db.models import Q
from django.core.exceptions import ValidationError
from django.core.exceptions import ObjectDoesNotExist


class SerializeUserRegister(ModelSerializer):
    """
    User Registration Serializer
    """
    class Meta:
        model = User
        fields = ['username',
                  'nickname',
                  'email',
                  'email2',
                  'password',
                  'password2']

    username = CharField(allow_blank=False, required=False, label='Username')
    nickname = CharField(allow_blank=True,  required=False, label='Nickname')
    email = EmailField(allow_blank=False, required=False, label='Email')
    email2 = EmailField(allow_blank=False, required=False,
                        label='Confirm Email')
    password = CharField(write_only=True, required=True, label='Password')
    password2 = CharField(write_only=True, required=True,
                          label='Confirm Password')

    def validate(self, data):
        """
        Ensure incoming data is validated.
        """
        # Enter any extra validation here
        return data

    def validate_email(self, value):
        """
        Validate the user's Email Address
        """
        data = self.get_initial()
        email1 = value
        email2 = data.get("email2")
        if email1 != email2:
            raise ValidationError("Emails must match")

        user = User.objects.filter(email=email2).first()
        if user is not None:
            raise ValidationError("Email already taken.")

        return value

    def validate_password(self, value):
        """
        Validate the user's Password
        """
        data = self.get_initial()
        password1 = value
        password2 = data.get("password2")
        if password1 != password2:
            raise ValidationError("Passwords must match")

        return value

    def create(self, validated_data):
        """
        User Registration
        - After the data has been validated,
          this function will actually add
          the user to the database.
        """
        username = validated_data['username']
        email = validated_data['email']
        password = validated_data['password']

        User.objects.create_user(username=username,
                                 email=email,
                                 password=password)

        return validated_data


class SerializeUserLogin(Serializer):
    token = CharField(allow_blank=True, read_only=True)
    username = CharField(allow_blank=True, required=False, write_only=True)
    password = CharField(allow_blank=False, required=True, write_only=True)
    email = EmailField(allow_blank=True, required=False, write_only=True)

    def validate(self, data):
        incorrect_msg = 'Incorrect Email/Username or Password'
        missing_msg = 'Missing Information'

        username = data.get('username')
        password = data.get('password')
        checked = data.get('checked')

        if (not username or not password):
            raise ValidationError(missing_msg)

        try:
            user = User.objects.get(Q(email=username) | Q(username=username))
        except ObjectDoesNotExist:
            raise ValidationError(incorrect_msg)

        if not user.check_password(password):
            raise ValidationError(incorrect_msg)

        data['user'] = user

        return data
