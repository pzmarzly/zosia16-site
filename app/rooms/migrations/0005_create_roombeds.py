# Generated by Django 2.2.3 on 2019-07-18 07:41

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('rooms', '0004_room_users'),
    ]

    operations = [
        migrations.CreateModel(
            name='RoomBeds',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('single', models.IntegerField(default=0)),
                ('double', models.IntegerField(default=0)),
                ('other', models.IntegerField(default=0)),
            ],
        ),
        migrations.RemoveField(
            model_name='room',
            name='capacity',
        ),
        migrations.RemoveField(
            model_name='room',
            name='users',
        ),
        migrations.AddField(
            model_name='room',
            name='members',
            field=models.ManyToManyField(related_name='room_of_user', through='rooms.UserRoom', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='userroom',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='room',
            name='available_beds',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='available_beds', to='rooms.RoomBeds'),
        ),
        migrations.AddField(
            model_name='room',
            name='beds',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='actual_beds', to='rooms.RoomBeds'),
        ),
    ]
