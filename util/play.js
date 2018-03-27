// play-1.js - file to include in html pages with abc2svg-1.js for playing
//
// Copyright (C) 2015-2018 Jean-Francois Moine
//
// This file is part of abc2svg.
//
// abc2svg is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// abc2svg is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with abc2svg.  If not, see <http://www.gnu.org/licenses/>.

// This file is just a wrapper around ToAudio (toaudio.js) and Audio5 (toaudio5.js)

function AbcPlay(conf) {
var	audio = ToAudio(),
	audio5 = Audio5(conf)

	return {
		clear: audio.clear,
		add: audio.add,
		play: audio5.play,
		stop: audio5.stop,
		get_vol: audio5.get_vol,
		set_sft: function() {},
		set_sfu: audio5.set_sfu,
		set_speed: audio5.set_speed,
		set_vol: audio5.set_vol,
		set_follow: audio5.set_follow
	}
} // AbcPlay
