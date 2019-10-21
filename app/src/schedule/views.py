from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.http.response import Http404
from django.shortcuts import get_object_or_404, redirect, render
from django.utils.translation import ugettext_lazy as _
from django.views.decorators.http import require_http_methods

from schedule.forms import EventForm
from schedule.models import Event, Schedule, ScheduleEntry


@login_required
@require_http_methods(['GET'])
def index(request):
    active_schedules = Schedule.objects.filter(is_active=True)
    if active_schedules.count() == 0:
        return render(request, 'schedule/no_schedule.html')

    schedule = active_schedules[0]
    schedule_entries = ScheduleEntry.objects.filter(schedule=schedule)
    ctx = {'objects': schedule_entries}
    return render(request, 'schedule/schedule.html', ctx)


@login_required
@require_http_methods(['GET', 'POST'])
def add_event(request):
    ctx = {'form': EventForm(request.POST or None)}
    if request.method == 'POST':
        if ctx['form'].is_valid():
            event = ctx['form'].save(commit=False)
            event.save()
            messages.success(request, _("Lecture has been saved"))
            return redirect('/')
        else:
            messages.error(request, _("Please review your form"))
    return render(request, 'schedule/add_event.html', ctx)


@login_required
@require_http_methods(['GET'])
def events(request):
    events = Event.objects.all()
    ctx = {'objects': events}
    return render(request, 'schedule/events.html', ctx)


@login_required
@require_http_methods(['GET', 'POST'])
def edit_event(request, event_id=None):
    if event_id == None:
        raise Http404()
    event = get_object_or_404(Event, pk=event_id)
    form = EventForm(request.POST or None, instance=event)
    if request.method == 'POST':
        if form.is_valid():
            event.save()
            messages.success(request, _("Event has benn saved"))
            return redirect('/schedule/events')
        else:
            messages.error(request, _('Please review your form'))
    ctx = {'form': form, 'object': event}
    return render(request, 'schedule/add_event.html', ctx)


@login_required
@require_http_methods(['GET'])
def show_event(request, event_id=None):
    if event_id == None:
        raise Http404()
    event = get_object_or_404(Event, pk=event_id)
    ctx = {'event': event}
    return render(request, 'schedule/show_event.html', ctx)


def planner(request):
    return render(request, 'schedule/planner.html')
