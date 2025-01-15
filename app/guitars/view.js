const views ={
    form(){
        return this._layout( `<form action="/guitars" method="post">
        <label for="guitar_make">Guitar Make:</label>
        <input type="text" id="guitar_make" name="guitar_make" required>

        <label for="guitar_model">Guitar Model:</label>
        <input type="text" id="guitar_model" name="guitar_model" >

        <input type="submit" value="Submit">
        </form>`);
    },
    list({guitars,title}){
        const liElement = guitars.map(({id,make,model})=> `<a href="/guitars/${id}"><li>${make} ${model}</li></a>`)
        return this._layout(
            `<h2>${title}</h2>
            <ul>
            ${liElement.join('')}
            </ul>`
        );
    },
    show({guitar}){
        return this._layout(
             `<h2>${guitar.make} ${guitar.model}</h2>`
        );
    },
    _layout(content){
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Simple HTML Template</title>
            <link rel="stylesheet" href="/asset/css/style.css">
            
        </head>
        <body>

        <header>
            <h1>Welcome to My Website</h1>
        </header>


        <main>
        ${content}
        </main>

        <footer>
            <p>&copy; 2025 My Website. All rights reserved.</p>
        </footer>
        </body>
        </html>
        `;
    }
}

export const view = (name,data)=>views[name](data);