import light_switch_effect from '../sounds/light-switch.mp3'; 
import camera_sound from '../sounds/camera-sound.mp3'; 
import cartoon_eye from '../sounds/Cartoon-eye.mp3'; 
import car_lock from '../sounds/car-lock-sound.mp3'; 

let audio = null;
let sounds = [
    light_switch_effect, 
    camera_sound, 
    cartoon_eye,
    car_lock
]

export const playSound = (index)=> {
    audio = new Audio(sounds[index]);
    audio.play();
}