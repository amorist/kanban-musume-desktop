/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */
/// <reference types="./types" />
import './index.css';
import './live2d.min.js';
import takePhoto from './capture-renderer';
import $ from "jquery";
import models from './model';
import { shell } from 'electron';

let index = 0;
loadlive2d('live2d', models[index]);

const hideMessage = ((timeout: number): void => {
  $(".kanban-tips")
    .stop()
    .css("opacity", 1);
  if (timeout === null) timeout = 5000;
  window.setTimeout(function () {
    sessionStorage.removeItem("kanban-text");
  }, timeout);
  $(".kanban-tips")
    .delay(timeout)
    .fadeTo(200, 0);
});

const showMessage = ((text: string, timeout: number, flag?: boolean): void => {
  if (
    flag ||
    sessionStorage.getItem("kanban-text") === "" ||
    sessionStorage.getItem("kanban-text") === null
  ) {
    if (Array.isArray(text))
      text = text[Math.floor(Math.random() * text.length + 1) - 1];

    if (flag) sessionStorage.setItem("kanban-text", text);

    $(".kanban-tips").stop();
    $(".kanban-tips")
      .html(text)
      .fadeTo(200, 1);
    if (timeout === null) timeout = 5000;
    hideMessage(timeout);
  }
});

const showHitokoto = ((): void => {
  $.getJSON(
    "https://api.imjad.cn/hitokoto/?cat=&charset=utf-8&length=55&encode=json",
    function (result) {
      showMessage(result.hitokoto, 5000);
    }
  );
});

$('.kanban-tool .user').click((): void => {
  if (index < models.length - 1) {
    index += 1;
  } else {
    index = 0;
  }
  loadlive2d('live2d', models[index]);
});

$('.kanban-tool .comment').click(() => {
  showHitokoto();
});

$('.kanban-tool .camera').click(async () => {
  $('.kanban-tool').hide();
  await takePhoto();
  $('.kanban-tool').show();
  showMessage("照好了嘛，是不是很可爱呢？", 5000, true);
});

$('.kanban-tool .camera').click(async () => {
  shell.openExternal('');
});

const now = new Date().getHours();
let text: string
if (now > 23 || now <= 5) {
  text = "你是夜猫子呀？这么晚还不睡觉，明天起的来嘛";
} else if (now > 5 && now <= 7) {
  text = "早上好！一日之计在于晨，美好的一天就要开始了";
} else if (now > 7 && now <= 11) {
  text = "上午好！工作顺利嘛，不要久坐，多起来走动走动哦！";
} else if (now > 11 && now <= 14) {
  text = "中午了，工作了一个上午，现在是午餐时间！";
} else if (now > 14 && now <= 17) {
  text = "午后很容易犯困呢，今天的运动目标完成了吗？";
} else if (now > 17 && now <= 19) {
  text = "傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红~";
} else if (now > 19 && now <= 21) {
  text = "晚上好，今天过得怎么样？";
} else if (now > 21 && now <= 23) {
  text = "已经这么晚了呀，早点休息吧，晚安~";
} else {
  text = "嗨~ 快来逗我玩吧！";
}
showMessage(text, 6000);
