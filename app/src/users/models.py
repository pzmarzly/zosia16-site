import hashlib

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.validators import MinLengthValidator
from django.db import models
from django.utils.translation import ugettext_lazy as _


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, is_staff=False,
                    is_active=True, **extra_fields):
        'Creates a User with the given username, email and password'
        email = UserManager.normalize_email(email)
        user = self.model(email=email, is_active=is_active,
                          is_staff=is_staff, **extra_fields)
        if password is not None:
            user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        return self.create_user(email, password, is_staff=True,
                                is_superuser=True, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(_('first name'), max_length=30, blank=True)
    last_name = models.CharField(_('last name'), max_length=30, blank=True)
    date_joined = models.DateTimeField(_('date joined'), auto_now_add=True)
    is_active = models.BooleanField(_('active'), default=True)
    is_staff = models.BooleanField(_('staff'), default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']
    objects = UserManager()

    @property
    def hash(self):
        return hashlib.sha256(
            f"{self.email}{self.first_name}{self.last_name}{self.date_joined}".encode('utf-8')
        ).hexdigest()[:8]

    @property
    def full_name(self):
        '''Returns the first_name plus the last_name, with a space in between.'''
        return f'{self.first_name} {self.last_name}'

    @property
    def reversed_name(self):
        '''Returns the last_name plus the first_name, with a space in between.'''
        return f'{self.last_name} {self.first_name}'

    def __str__(self):
        return self.full_name


class Organization(models.Model):
    name = models.CharField(
        max_length=300,
        validators=[MinLengthValidator(1)]
    )
    accepted = models.BooleanField(
        default=False
    )
    user = models.ForeignKey(
        User,
        null=True,
        blank=True,
        on_delete=models.SET_NULL)

    @property
    def owner(self):
        if self.accepted:
            return ''
        else:
            return '({})'.format(str(self.user))

    def __str__(self):
        return "{} {}".format(self.name, self.owner)
