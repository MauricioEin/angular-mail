import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class UtilService{
    
     makeId(length = 5): string {
        var txt = ''
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        for (var i = 0; i < length; i++) {
            txt += possible.charAt(Math.floor(Math.random() * possible.length))
        }
        return txt
    }
    
    makeLorem(wordCount = 100):string {
        const words = ['The sky', 'above', 'baba', 'roti', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', 'All', 'this happened', 'more or less', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', 'It', 'was', 'a pleasure', 'to', 'burn']
        var txt = ''
        while (wordCount > 0) {
            wordCount--
            txt += words[Math.floor(Math.random() * words.length)] + ' '
        }
        return txt
    }
    
     makeName():string {
        const names = ['Roei', 'Ido', 'Tal', 'Bar', 'Yossi','Moshe','Ben']
        return names[Math.floor(Math.random() * names.length)]
    }

}