import React from "react";

const Saved = (props) => {
    const handleDelete = (quote) => {
        props.onDelete(quote);
    }
    return (
        <div id="saved-box">
            <div className="saved-header">
                <h1>Saved Quotes</h1>
                <button className="clear-button" onClick={props.onClear}>Clear All</button>
            </div>
            {props.quote.map((quote, index) => (
                <div className="quote-container" key={index}>
                    <div className="quote-content">
                        <q>{quote.content}</q>
                        <p> - {quote.author}</p>
                    </div>
                    <button className="delete-button" onClick={()=>handleDelete(quote)}>&#10006;</button>
                </div>
            ))
            }
        </div>
    );
}
 
export default Saved;