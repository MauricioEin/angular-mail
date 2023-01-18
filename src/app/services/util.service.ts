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
        const words = ['sky','bonus','finance','dollar','cv','action','bonus','possible','now', 'above', 'baba', 'roti', 'the port', 'was', 'television', 'tuned', 'to', 'channel', 'All', 'happened','this', 'more','random', 'I', 'had', 'story', 'bit', 'people','various','from', 'and', 'generally', 'happens','cases','interview','problem', 'such', 'time','each', 'it', 'was', 'different','story', 'It', 'was', 'pleasure', 'to', 'burn']
        var txt = ''
        while (wordCount > 0) {
            wordCount--
            txt += words[Math.floor(Math.random() * words.length)] + ' '
        }
        return txt
    }
    
     makeName():string {
        const names = ['Roei Hillel', 'Ido Battis', 'Tal Itzhakov', 'Bar Gridish', 'Yossi Shasho','Moshe Abargel','Ben Cohen', 'Adi Suissa', 'Chen Movshovitz', 'Adva Cotani', 'Liron Bendor', 'Atalia Zahavy', 'Daniel Peretz']
        return names[Math.floor(Math.random() * names.length)]
    }

}