# -*- coding: utf-8 -*-
# Generated by Django 1.10.8 on 2019-02-03 20:30
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('conferences', '0010_auto_20190120_1900'),
    ]

    operations = [
        migrations.AddField(
            model_name='bus',
            name='name',
            field=models.TextField(default='Bus'),
        ),
    ]
