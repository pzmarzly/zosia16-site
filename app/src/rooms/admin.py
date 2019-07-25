from django.contrib import admin
from .models import Room, RoomBeds, RoomLock, UserRoom

admin.site.register(Room)
admin.site.register(RoomLock)
admin.site.register(UserRoom)
admin.site.register(RoomBeds)
