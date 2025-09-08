from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=200)
    details = models.TextField()
    target = models.DecimalField(max_digits=10, decimal_places=2)
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return self.title
