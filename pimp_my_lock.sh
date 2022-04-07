#!/bin/bash
if [ $# -lt 1 ]; then
	echo "Usage: $0 <path_to_media> [<x> <y> [<width> <height>]]"
	exit 1
fi
ft_lock
until grep '"ft_lock":' <(xwininfo -tree -root) > /dev/null; do
	sleep 1
done
sleep 1
$(dirname $0)/pimp_my_lock $1 $2 $3 $4 $5 &
pid=$!
export LD_LIBRARY_PATH=$(dirname $0)/xdotool
while pgrep -f "ft_lock +-d" > /dev/null; do
	w_id=$(xwininfo -root -tree | grep ft_lock | head -n 1 | sed 's/ *\(0x[a-z0-9]\+\).*/\1/')
	$(dirname $0)/xdotool/xdotool click 1
	sleep 1
done
cd -
kill $pid
