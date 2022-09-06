from django.contrib import admin
from .models import CustomUser, CompanyProfile, EmployeeeProfile


admin.site.register(CustomUser)
admin.site.register(CompanyProfile)
admin.site.register(EmployeeeProfile)