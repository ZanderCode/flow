// Simple Data Model for Flow "innerHTML" componets in database
// Expects an html string
// Expects a style string

class Flowtemeal{
    constructor(){
        super(props);
        this.html = props.html;
        this.css = props.css;
        this.comp = null;
    }

    fromJSON(data){
        
    }

    // Transform into component
    toComp(html,css){
        let newComp = document.createElement( 'html' );
        newComp.innerHTML = this.html;
        newComp.style = this.css;
        this.comp = newComp;
    }
}

export default Flowtemeal; 