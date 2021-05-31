var then = new Date("2019-06-20T16:00:00.000-05:00");
now = new Date;
diff = Math.round((now - then) / (1000 * 60 * 60 * 24)) - 1;
document.write(diff);
