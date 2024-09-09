import React from 'react'

export default function Guess({state, answer}) {
    if (state == 'no answer') {
        return (
            <div className="noAnwer"/>
        );
    } else if (state == 'right') {
        return (
            <div className="rightAnswer">
                <span>{answer}</span>
            </div>
        );
    } else if (state == 'wrong') {
        return (
            <div className="wrongAnswer">
                <span>{answer}</span>
            </div>
        );
    } else if (state == 'skipped') {
        return (
            <div className="skippedAnswer">
                    <span>Skipped</span>
            </div>
        );
    }
}