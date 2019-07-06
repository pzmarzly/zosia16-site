# Generated by Django 2.2.2 on 2019-07-06 19:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
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
        migrations.AddField(
            model_name='room',
            name='available_beds',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='available_beds_in_room', to='rooms.RoomBeds'),
        ),
        migrations.AddField(
            model_name='room',
            name='beds',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='actual_beds_in_room', to='rooms.RoomBeds'),
        ),
    ]
