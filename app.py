import Retica
import Retica.Render
retica = Retica.Server(__name__)

templator = Retica.Render.TemplateRender(retica,template_dir="Templates")

@retica.create_endpoint("/")
def index(request: Retica.Request.request, response: Retica.Response.response, **data):
    response.body = templator.render("index.jinja")
    with open("Crawlers.txt","a") as f:
        f.write(str(request.headers) + '\n')
    lowercase_headers = {k.lower(): v for k, v in request.headers.items()}
    if ("bot" in lowercase_headers[b"user-agent"].decode() or "spider" in lowercase_headers[b"user-agent"].decode() or "crawler" in lowercase_headers[b"user-agent"].decode()):
        response.body = templator.render("crawlers/index.html")

@retica.create_endpoint("/blog")
def blogs(request: Retica.Request.request, response: Retica.Response.response, **data):
    response.body = templator.render("blog.jinja")