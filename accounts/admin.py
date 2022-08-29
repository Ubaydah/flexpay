from django.contrib import admin
from .models import CustomUser, CompanyProfile


admin.site.register(CustomUser)
admin.site.register(CompanyProfile)
