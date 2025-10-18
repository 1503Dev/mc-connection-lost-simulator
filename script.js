const texts = $('.texts');
const bar = $('.bar');
const container = $('.container');
const tip = $('.tip');
const tipProgressBar = $('.tip .progress-bar');
const defaultText = `连接已丢失


§cTheChuan1503 您因 §e§l点击速度过快 §r§c已被封禁 30 分钟.

§7封禁时间: §r2025-10-18 19:32:10
§7剩余时间: §a29 分钟
§7如有疑问，可§c重新连接§7进行申诉！`;

var currentText = localStorage.getItem('text');
if (!currentText) {
    currentText = defaultText;
}

function updateText() {
    texts.html(MCFormat.parse(currentText));
}
updateText();

function editText() {
    const newText = prompt('编辑连接丢失信息', currentText).replace(/\\n/g, '\n');
    if (newText) {
        currentText = newText;
        updateText();
        localStorage.setItem('text', currentText);
    }
}

function resetText() {
    currentText = defaultText;
    updateText();
    localStorage.removeItem('text');
}

function oss() {
    alert(
`MCFormat.JS - MIT license
JQuery - MIT license
Unifont - SIL Open Font License 1.1
MC Connection Lost Simulator - Apache License 2.0

https://github.com/1503Dev/mc-connection-lost-simulator
https://1503dev.github.io/mc-connection-lost-simulator
Copyright 2023-2025 1503Dev/TheChuan1503`
);
}

window.onload = function () {
    container.show();
    tip.animate({
        top: '0px',
        opacity: 1,
    }, 200, () => {
        tipProgressBar.animate({
            width: '0%',
        }, 2000, () => {
            tip.animate({
                top: '-32px',
                opacity: 0,
            }, 200, () => {
                tip.hide();
            });
        });
    })
}