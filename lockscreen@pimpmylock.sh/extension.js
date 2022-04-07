/*In this example we will be click a button in the top bar,
  causing an event that create a text label (hello world), which with some
  animation, will be decreasing its opacity from 100% to 0%
 */


/*Import St because is the library that allow you to create UI elements*/
const St = imports.gi.St;
/*
  Import Main because is the instance of the class that have all the UI elements
  and we have to add to the Main instance our UI elements
  */
const Main = imports.ui.main;
const Mainloop = imports.mainloop;

/*Import tweener to do the animations of the UI elements*/
const Tweener = imports.ui.tweener;

/* Import Util to spawn command */
const Util = imports.misc.util;

const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;

/*Global variables for use as button to click (button) and a text label.*/
let text, button;
let debounceTimeout = null;

function init() {
}

function _lock() {
/*    Util.spawn(['/usr/bin/i3lock', '-c', '000000', '-p', 'win']) */
/*    Util.spawn(['/usr/bin/xscreensaver-command', '-lock']) */
/*    Util.spawn(['/usr/share/42/lock.sh']) */


    if (debounceTimeout === null) {
      debounceTimeout = Mainloop.timeout_add(420, function() {
        debounceTimeout = null;
/*	let proc = Gio.Subprocess.new(['xscreensaver-command', '-lock'], 0); */
//	let proc = Gio.Subprocess.new(['/mnt/nfs/homes/jmaia/conga/goose_lock.sh'], 0);
	let proc = Gio.Subprocess.new([GLib.getenv('HOME') + "/pimp_my_lock_wrapper.sh"], 0);
	proc.wait_async(null, null);
        return false;
      });
    }

}

function enable() {

    button = new St.Bin({ style_class: 'panel-button',
                          reactive: true,
                          can_focus: true,
                          x_fill: true,
                          y_fill: false,
                          track_hover: true });
    let icon = new St.Icon({ icon_name: 'changes-prevent-symbolic',
                             style_class: 'system-status-icon' });
    button.set_child(icon);
    button.connect('button-press-event', _lock);
    Main.panel._rightBox.insert_child_at_index(button, 0);
}

function disable() {
        /*
         we remove the button from the right panel
         */
    Main.panel._rightBox.remove_child(button);
    button = null;
}
