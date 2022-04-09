# Pre-work - *Memory Game*

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: Ibrahim Allahbukhsh

Time spent: 42 hours spent in total

Link to project: (live site) https://codepath-prework---ibrahim-allahbukhsh.glitch.me 

(code) https://glitch.com/edit/#!/codepath-prework---ibrahim-allahbukhsh

## Required Functionality

The following **required** functionality is complete:

* [X] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
* [X] "Start" button toggles between "Start" and "Stop" when clicked. 
* [X] Game buttons each light up and play a sound when clicked. 
* [X] Computer plays back sequence of clues including sound and visual cue for each button
* [X] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [X] User wins the game after guessing a complete pattern
* [X] User loses the game after an incorrect guess

The following **optional** features are implemented:

* [X] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
* [X] Buttons use a pitch (frequency) other than the ones in the tutorial
* [X] More than 4 functional game buttons
* [X] Playback speeds up on each turn
* [X] Computer picks a different pattern each time the game is played
* [X] Player only loses after 3 mistakes (instead of on the first mistake)
* [X] Game button appearance change goes beyond color (e.g. add an image)
* [X] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
* [X] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

Created doNotCheat function so people are unable to cheat and select buttons as the computer is giving out the clues and the timer is not running

Displays text to user when it's their turn to repeat the pattern or when the computer is playing the pattern

Allowed users to set there own desired length of the pattern

Allowed users to set there own desired length clue hold time

Allowed users to set there own desired amount of clue hold time that changes each turn



- [Diffent levels of difficulty with shorter amount of time to play back pattern and clue sequences being played even faster than what I have right now, multiples sounds for each button, Create a musical mode where it just plays random instruments at the same time since all of my buttons already play instruments it wouldn't be too hard to add a few more buttons. I would overall want to make a better user interface] 

## Video Walkthrough (GIF)

If you recorded multiple GIFs for all the implemented features, you can add them here:
First win showcase
![](http://g.recordit.co/oxJbePLkFj.gif)
Shows strikes allowing 2 mistakes, but on the third one you lose
![](http://g.recordit.co/45Tn4PL0pU.gif)
Shows randomly generated patterns each time the game starts, clueHoldTime decreaseing each turn and showing user changing pattern length
![](http://g.recordit.co/FckcXx6wtt.gif)
Shows user selecting a button before the timer starts which causes the user to lose the game 
![](http://g.recordit.co/Rq0sIB65C0.gif)
Shows user running out of time and losing the game 
![](http://g.recordit.co/WXn42Yk9Rx.gif)

## Reflection Questionss
1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. 
[programminghead.com, ￼w3schools.com, mozilla.org, GeeksforGeeks.org]

2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words) 
[I had many challenges particularly with completing a lot of the optional features. The ticking clock feature gave me the hardest time. Because you need to know when to start, when to restart and especially you need to know how to update the timer and make a visual clock the user can see. Well one of the problems I had was that I was calling the timer when you press the start button, but with a little bit of a delay because we have to start the time when the computer is done giving out the clues. And so if you pressed the start button and right after press the stop button before the startTimer function has the chance to be called. That means the stopTimer is called to stop the time, but the time hasn't started yet. So then after the delay the timer starts even though the game is not playing. This problem really got me stuck for a good hour or two even though in the end it was pretty obvious. Why not just make it so the time only runs when the gamePlaying variable is true. Even though it was simple it made me go through my code a different way and think out the box. After this problem I was able to solve a lot of other different problems much more logically and easily. For the smaller challenges I would use console.log a lot to get a good understanding of what my code is doing so far.]

3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words) 
[After completing my submission i've realized that all it takes is some practice/experimentation because with HTML/JS/CSS you can directly see the result your code and you can play around with it until you understand how it works. But I feel as though with just using HTML/JS/CSS you're there's so many thing we can do, but it take a long time and tons of lines of code.  I know there is a lot more to web development than HTML/JS/CSS that I have yet to actually explore. And there is so much more you can do in web development. So what would you say is your favorite topic from web development that's not HTML/JS/CSS that makes web development more exciting? I know during this program we explore a lot of these other topics, throughout the summer, but I would like to get a heads up.]

4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words) 
[I would add more features, to make the game look more user friendly. Particularly with animations, i've tried to do it in this project, but it was gonna take too long for me to figure it out. I've already spent way too many hours trying to figure out how everything works for things I don't really need for the project. I would like to make it as smooth as possible, if I knew how because sometimes it can feel clunky. I would add more buttons to make a mode which plays different instruments in a certain random pattern to make some type of beat or music as a fun mode. I was also thinking about making a piano mode where instead of instruments, the buttons are different keys on a keyboard and it can help teach the user to play a piano version of certain songs. But right now I feel as though since we are justing starting with the beginner level topics we don't really realize the full potential of what we can do with web development with certain topics we'll learn over the summer.]



## Interview Recording URL Link

[My 5-minute Interview Recording](https://buffalo.zoom.us/rec/share/eM97FGPswj_4lP31A1D5cZPC4f_mGdkafffKR0YICIaeCu8DTXLtbqJNHaWx9NrY.CiZ-HMwo6GtQ55bM)


## License

    Copyright [Ibrahim Allahbukhsh]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
