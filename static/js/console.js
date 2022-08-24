class Console {
    constructor() {
        this.state = "login"
        this.user = null
        this.history = []
    }

    output(data) {
        var node = document.createElement("span")
        node.classList.add("accent-text")
        node.innerHTML = data
        document.querySelector(".console-output").appendChild(node)
    }

    outputIconButton(href, icon) {
        return `&nbsp;<a href='${href}'><ion-icon name='logo-${icon}'></ion-icon></a>`
    }

    setState(state) {
        this.state = state
        if (state == "home") {
            document.querySelector(".pre-text").innerText = this.user + "@portfolio:~$"
        }
    }

    execute(data) {
        uConsole.output(document.querySelector(".pre-text").innerText + data.join(" "))
        switch(this.state) {
            case "login":
                if(data.length > 1) {
                    this.output("Invalid username. Please Don't use spaces.")
                } else {
                    this.output("Hi " + data[0] + "! Welcome to Sushant Shah's Portfolio v1.0")
                    this.output('You Can Use <span class="code-block">help</span> For A List Of Available Commands.')
                    this.user = data[0]
                    this.setState("home")
                }
                break;
            case "home":
                switch(data[0]) {
                    case "help":
                        this.output("Available Commands:")
                        this.output("help - Displays this message")
                        this.output("clear - Clears the console")
                        this.output("projects - Displays a list of projects")
                        this.output("project &lt;index&gt; - Explore A Project")
                        this.output("contact - Displays contact information")
                        break;
                    case "clear":
                        document.querySelector(".console-output").innerHTML = ""
                        break;
                    case "projects":
                        this.output("Available Projects:")
                        this.output("portfolio - This website")
                        this.output("retica - A Web Framework")
                        this.output("devsidekick - A tool for developers accessible via Discord.")
                        break;
                    case "project":
                        if(data.length != 2) {
                            this.output("Invalid Syntax. Please Use <span class='code-block'>project &lt;index&gt;</span>")
                        } else {
                            switch(data[1]) {
                                case "portfolio":
                                    this.output("This website is a portfolio website made by Sushant Shah.")
                                    this.output("It is built using HTML, CSS, and Javascript.")
                                    this.output("It has a custom terminal emulator built using Javascript.")
                                    this.output("It is served using the Retica Web Framework for Python.")
                                    break;
                                case "retica":
                                    this.output("Retica is a web framework for Python.")
                                    this.output("&nbsp;Features:")
                                    this.output("&nbsp;   Supports multiple ports and is easy to use.")
                                    this.output("&nbsp;   Built-In support for Jinja templating.")
                                    this.output("&nbsp;   Integrated with the Retica CLI.")
                                    this.output("&nbsp;")
                                    this.output("&nbsp;Retica is currently in development.")
                                    this.output(
                                        this.outputIconButton("https://github.com/cyrocoders/Retica", "github") +
                                        this.outputIconButton("https://pypi.org/project/Retica/", "python")
                                        )
                                    break;
                                case "devsidekick":
                                    this.output("DevSideKick is a tool for developers accessible via Discord.")
                                    this.output("&nbsp;Features:")
                                    this.output("&nbsp;    Ability To Manage Your Projects On Github")
                                    this.output("&nbsp;    Shared Project (KanBan) Boards")
                                    this.output("&nbsp;    Integrated With StackOverflow For Easy Access To Answers")
                                    this.output("&nbsp;    Integrated With Google For Easy Access To Documentation")
                            }
                        }
                        break;
                    case "contact":
                        this.output("Email: <a href='mailto:mail@sushantshah.dev'>mail@sushantshah.dev</a>")
                        this.output("Discord: <a href='https://discord.com/users/973319034063966268'>sushantshah_dev#2703</a>")
                        this.output("Twitter: <a href='https://twitter.com/sushantshah_dev'>@sushantshah_dev</a>")
                        this.output("GitHub: <a href='https://github.com/sushantshah-dev'>sushantshah-dev</a>")
                        break;
                    default:
                        this.output("Unknown Command: " + data[0])
                    break;
                }
                break;
            
        }
    }
}

uConsole = new Console()

cursor_pos = -1
document.body.addEventListener("keydown", (e) => {    
    if (e.key === "Enter") {
        data = [""]
        document.querySelector(".input-text .accent-text").innerText.split('').forEach((character) => {
            if (character === " "){
                data.push("")
            } else {
                data[data.length - 1] += character
            }
        });
        document.querySelector(".input-text .accent-text").innerText = "";
        uConsole.execute(data)
    } else if (e.key.length === 1) {
        text = document.querySelector(".input-text .accent-text").innerText
        text = text.slice(0, text.length + cursor_pos + 1) + e.key + text.slice(text.length + cursor_pos + 1, text.length);
        document.querySelector(".input-text .accent-text").innerText = text
    } else if (e.key === "Backspace") {
        text = document.querySelector(".input-text .accent-text").innerText
        text = text.slice(0, text.length + cursor_pos) + text.slice(text.length + cursor_pos + 1);
        document.querySelector(".input-text .accent-text").innerText = text
    }
    if (e.key === "ArrowLeft") {
        if (-cursor_pos < document.querySelector(".input-text .accent-text").innerText.length) {
            cursor_pos -= 1
        }
        console.log(cursor_pos)
    } else if (e.key === "ArrowRight") {
        if (cursor_pos < -1) {
            cursor_pos += 1
        }
    }
    cursor_pos = Math.min(cursor_pos, -1)
    cursor_pos = Math.max(cursor_pos, -document.querySelector(".input-text .accent-text").innerText.length)
    document.querySelector("span.cursor").style.marginLeft = cursor_pos + "ch"
});

document.querySelector(".console-input").addEventListener("click", () => {
    document.body.focus();
});