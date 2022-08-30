from rest_framework import permissions


class EmployerAccess(permissions.BasePermission):
    message = "You do not have the required access"
    code = 403

    def has_permission(self, request, view):
        return request.user.is_employer == True


class EmployeeAccess(permissions.BasePermission):
    message = "You do not have the required access"
    code = 403

    def has_permission(self, request, view):
        return request.user.is_employee == True
