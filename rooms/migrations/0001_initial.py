# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-12-10 23:26
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('conferences', '0004_auto_20161210_1317'),
    ]

    operations = [
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=300)),
                ('description', models.TextField(default='')),
                ('capacity', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='RoomLock',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('expiration_date', models.DateTimeField()),
                ('password', models.CharField(max_length=4)),
            ],
        ),
        migrations.CreateModel(
            name='UserRoom',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('room', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='rooms.Room')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='room',
            name='lock',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='rooms.RoomLock'),
        ),
        migrations.AddField(
            model_name='room',
            name='zosia',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='conferences.Zosia'),
        ),
    ]
