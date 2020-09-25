import React, { useState, useCallback, useEffect } from "react";
import Wad from 'web-audio-daw';
import './styles.css';
import lines from '../Icons/lines.png'

import { ReactComponent as MicrophoneIcon } from '../Icons/microphone-svgrepo-com 1.svg';

export default class WadTest extends React.Component {

    constructor(props) {
        super(props);
        this.voice = new Wad({ source: 'mic' });
        this.tuner = new Wad.Poly();
        this.tuner.setVolume(0); // If you're not using headphones, you can eliminate microphone feedback by muting the output from the tuner.
        this.tuner.add(this.voice);
        this.state = {
            note: ""
        };

        this.lastNotesCount = 10;
        this.lastNotesCounter = 0;
        this.lastNotes = new Array(this.lastNotesCount);
        this.emptyCounter = 0;

        this.notes = [
            ['C', 'Do'],
            ['C#', "Do"],
            ['D', 'Re'],
            ['D#', 'Re'],
            ['E', 'Mi'],
            ['F', 'Fa'],
            ['F#', 'Fa'],
            ['G', 'Gi'],
            ['G#', 'Gi'],
            ['A', 'La'],
            ['A#', 'La'],
            ['B', 'Si']
        ];

        this.circleRef = React.createRef();
        this.noteHitRefs = new Array(this.notes.length);
        for (let i = 0; i < this.noteHitRefs.length; i++) {
            this.noteHitRefs[i] = React.createRef();
        }

        this.logPitch = this.logPitch.bind(this);
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.isCurrentNote = this.isCurrentNote.bind(this);
        this.microAllowed = this.microAllowed.bind(this);
    }

    logPitch = () => {
        let note = this.tuner.noteName
        // console.log(this.tuner)
        console.log(this.tuner.pitch, note);
        if (note) {
            this.emptyCounter = 0;
            this.setState({ note: note });
            this.lastNotes[this.lastNotesCounter++] = note;
            if (this.lastNotesCounter >= this.lastNotes.length)
                this.lastNotesCounter = 0;
            this.paint();
        }
        requestAnimationFrame(this.logPitch)
        if (!this.tuner.noteName && this.emptyCounter++ >= 100) {
            for (let i = 0; i < this.lastNotes.length; i++) {
                this.lastNotes[i] = undefined;
            }
            this.lastNotesCounter = 0;
            this.paint();
        }
        this.tuner.noteName = undefined;
    }

    microAllowed(stream) {
        this.voice.play(); // You must give your browser permission to access your microphone before calling play().
        this.tuner.updatePitch() // The tuner is now calculating the pitch and note name of its input 60 times per second. These values are stored in <code>tuner.pitch</code> and <code>tuner.noteName</code>.
        this.logPitch();
    }

    start = () => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(this.microAllowed)
            .catch(function(err) {
                console.error('No mic for you: ', err)
            });
    };

    stop = () => {
        this.tuner.stopUpdatingPitch(); // Stop calculating the pitch if you don't need to know it anymore.
        cancelAnimationFrame(this.logPitch)
        this.tuner.stop();
    };

    isCurrentNote = (item) => {
        const { note } = this.state;
        if (note.length === 3 && item[0].length === 2) {
            return String(note).substr(0, 2) == item[0];
        }
        return note[0] == item[0] && !String(note).includes('#');
    }

    findRefByNote(note) {
        for (let i = 0; i < this.noteHitRefs.length; i++) {
            if (this.noteHitRefs[i].current.id == note) {
                return this.noteHitRefs[i];
            }
        }
    }

    paint() {
        this.noteHitRefs.map(item => {
            let div = item.current;
            let id = div.id;

            let count = this.lastNotes.filter(note => String(note).substring(0, String(note).includes("#") ? 2 : 1) == id).length;
            div.style.height = `${11 * count}px`;
        })
    }

    render() {
        return (
            <div>
                <button onClick={this.start}>Start</button>
                <button onClick={this.stop}>Stop</button>
                <h2>{this.notes.map(item => {
                    return (this.isCurrentNote(item) ? (<span><b style={{ color: "red" }}>{item[0]}</b>&nbsp;|&nbsp;</span>) : (item[0] + " | "))
                })}</h2>

                <div style= {{
                    width: 410,
                    height: 410,
                    borderRadius: 205,
                    background: 'linear-gradient(139.08deg, #353A40 10.44%, #121416 95.94%)',
                    boxShadow: '52px 20px 88px rgba(2, 3, 3, 0.5), -15px -16px 56px rgba(232, 237, 243, 0.08), inset -16px -6px 80px rgba(248, 249, 249, 0.03)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: 150
                }}>
                    <div className={"kek"} ref={this.circleRef} style={{
                        width: 150, height: 150, position: 'relative', display: 'flex', justifyContent: 'center', overflow: 'visible'
                    }}>
                        {this.notes.map((item, index) => {
                            const angle = 360 / this.notes.length;
                            const radius = 150;
                            const offsetToChildCenter = 50;
                            const offsetToParentCenter = 150 / 2;//parseInt(this.circleRef.current.offsetWidth / 2);
                            var totalOffset = offsetToParentCenter - offsetToChildCenter;

                            return (
                                <div className="shape-note" key={index} style={{
                                    top: Math.sin((angle * index) * (Math.PI / 180)) * radius + totalOffset - 3,
                                    left: Math.cos((angle * index) * (Math.PI / 180)) * radius + totalOffset + 4,
                                    transform: `rotate(${360 / this.notes.length * index - 90}deg)`,
                                    
                                }}>
                                    {/* <div style={{overflow: 'visible', padding: 1}}> */}
                                        <span style={{ color: "white", transform: `rotate(${-360 / this.notes.length * index + 90 }deg)`, position: 'absolute', zIndex: 5, top: "40%", left: "40%" }}>{item[0]}</span>
                                        <div ref={this.noteHitRefs[index]} id={this.notes[index][0]} className={"green-hit-note-area"}>
                                        </div>
                                    {/* </div> */}
                                </div>)
                        })}
                        <div style={{ backgroundColor: '#35393E', width: 100, height: 100, borderRadius: 50, alignSelf: 'center', display: 'flex', justifyContent: 'center',
                                alignItems: 'center' }}>
                                    <div style={{width: 60, height: 60, borderRadius: 30, background: '#E51A1A', boxShadow: '0px 2px 32px #FF1E1C, 0px 2px 5px rgba(238, 57, 0, 0.1)',
                                            border: '1px solid #AA1313',display: 'flex', justifyContent: 'center',alignItems: 'center' }}>
                                                <div style={{background: `url(${lines}) no-repeat`, backgroundSize: 50, width:50, height: 50, display: 'flex', justifyContent: 'center',alignItems: 'center'}}>
                                                <MicrophoneIcon width={25} height={25}/>
                                                </div>
                                                
                                    </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}