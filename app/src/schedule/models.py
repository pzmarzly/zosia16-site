
from django.db import models
from django.utils.translation import ugettext_lazy as _

class Event(models.Model):
    title = models.CharField(verbose_name=_("Title"), max_length=256)
    description = models.CharField(verbose_name=_("Description"), max_length=2048)
    duration = models.IntegerField(verbose_name=_("Duration"))
    create_date = models.DateTimeField(verbose_name="Creation date",
                                       auto_now_add=True)
    notes = models.CharField(verbose_name=_("Notes"), max_length=800,
                            help_text=_("Your suggestions, requests and "
                                        "comments intended for organizers and"
                                        " a lot more,"), blank=True, null=True)
    event_type = models.CharField(
        _("Type"),
        choices=[('1', "Workshop"), ('2', "Lecture"), ('3', "Meal"), ('4', "Other")],
        max_length=3,
        default='4')

class Schedule(models.Model):
    name = models.CharField(verbose_name=_("Name"), max_length=256)
    is_active = models.BooleanField()

class ScheduleEntry(models.Model):
    event = models.ForeignKey(Event, verbose_name=_("Event"), on_delete=models.CASCADE)
    schedule = models.ForeignKey(Schedule, verbose_name=_("Schedule"), related_name='entry', on_delete=models.CASCADE)
    start = models.DateTimeField(verbose_name="Start")
    end = models.DateTimeField(verbose_name="End")

