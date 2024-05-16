# Install KDE

## Packages 

```bash
sudo pacman -S bspwm sxhkd polybar picom dmenu dunst nitrogen alacritty thunar
sudo pacman -S bspwm sxhkd polybar picom dmenu dunst nitrogen alacritty thunar brave lxappearance rofi networkmanager alsa-utils xorg-xrandr feh


# Set up directories
cd $HOME/.config
mkdir bspwm sxhkd polybar picom dunst

# Copy config files 
cp /usr/share/doc/bspwm/examples/bspwmrc bspwm/
cp /usr/share/doc/bspwm/examples/sxhkdrc sxhkd/
cp /etc/xdg/picom.conf picom/
cp /etc/polybar/config.ini polybar/
cp /etc/dunst/dunstrc dunst/

# Make bspwmrc executable
chmod +x bspwm/bspwmrc

In bspwmrc, delete all rules.

# Edit bspwmrc
nano bspwm/bspwmrc

# Add autostart commands
sxhkd &
picom --config $HOME/.config/picom/picom.conf &
nitrogen --restore &
dunst &
polybar &

# Navigate to sxhkd directory
cd sxhkd

# Edit sxhkdrc
nano sxhkdrc
