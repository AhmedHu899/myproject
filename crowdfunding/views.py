from django.shortcuts import render, redirect, get_object_or_404
from .models import Project

# -------------------------
# الصفحة الرئيسية
# -------------------------
def home(request):
    return render(request, 'home.html')


# -------------------------
# إدارة المشاريع (CRUD)
# -------------------------
def projects_list(request):
    projects = Project.objects.all()
    return render(request, 'projects_list.html', {'projects': projects})

def create_project(request):
    if request.method == 'POST':
        title = request.POST['title']
        details = request.POST['details']
        target = request.POST['target']
        start_date = request.POST['start_date']
        end_date = request.POST['end_date']
        Project.objects.create(
            title=title,
            details=details,
            target=target,
            start_date=start_date,
            end_date=end_date,
        )
        return redirect('projects_list')
    return render(request, 'create_project.html')

def edit_project(request, project_id):
    project = get_object_or_404(Project, id=project_id)
    if request.method == 'POST':
        project.title = request.POST['title']
        project.details = request.POST['details']
        project.target = request.POST['target']
        project.start_date = request.POST['start_date']
        project.end_date = request.POST['end_date']
        project.save()
        return redirect('projects_list')
    return render(request, 'edit_project.html', {'project': project})

def delete_project(request, project_id):
    project = get_object_or_404(Project, id=project_id)
    if request.method == 'POST':
        project.delete()
        return redirect('projects_list')
    return render(request, 'delete_project.html', {'project': project})


# -------------------------
# صفحات ثابتة (عن الشركة + اتصل بنا)
# -------------------------
def about(request):
    return render(request, 'about.html')

def contact(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        message = request.POST.get('message')

        # هنا ممكن تحفظ البيانات في DB أو تبعتها على إيميل
        # دلوقتي هنعمل بس رسالة تأكيد
        success_message = "تم استلام رسالتك بنجاح، سنتواصل معك قريبًا."
        return render(request, 'contact.html', {'success_message': success_message})

    return render(request, 'contact.html')
