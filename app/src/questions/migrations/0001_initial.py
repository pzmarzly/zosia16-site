# Generated by Django 2.2.8 on 2019-12-13 13:06

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='QA',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.CharField(max_length=150, verbose_name='Question')),
                ('answer', models.CharField(max_length=500, verbose_name='Answer')),
            ],
        ),
    ]
