Here are some notes on wrangling Khan Academy videos to create a video
thumbnail with a small file size.

 * Page on audio codecs: [https://trac.ffmpeg.org/wiki/Encode/AAC](https://trac.ffmpeg.org/wiki/Encode/AAC)
 * Page about encoding audio for podcasts. 32k (which seems to work for us) is lower than the BBC recommendations: [http://www.richardfarrar.com/choosing-bit-rates-for-podcasts/](http://www.richardfarrar.com/choosing-bit-rates-for-podcasts/)


### Configure ffmpeg w/FDK AAC codec

The Fraunhofer FDK AAC codec is apparently a good audio encoder, and
allows playing with VBR settings. This is important, since the default
video encoder is significantly less efficient (I regularly got 80KB
for 5 seconds w/the default instead of 60KB with FDK AAC).

Here's how to configure it on a Mac with homebrew:
    
    brew reinstall ffmpeg --with-libvpx --with-fdk-aac


### The short story

Here's how to thumbnail some KA videos at 640 width and 32k
audio. These are decent trade-offs, see the rest of the doc. Videos
with more imagery in the first 5 seconds have larger file sizes:

    ffmpeg -t 5 -i http://fastly.kastatic.org/KA-youtube-converted/-05OfTp6ZEE.mp4/-05OfTp6ZEE.mp4 -filter:v scale=640:-1 -b:a 32k -- -05OfTp6ZEE_thumb.mp4
    ffmpeg -t 5 -i http://fastly.kastatic.org/KA-youtube-converted/kpCJyQ2usJ4.mp4/kpCJyQ2usJ4.mp4 -filter:v scale=640:-1 -b:a 32k kpCJyQ2usJ4_thumb.mp4

The first video thumbnail is 30KB and the second is 70KB.


### Playing around w/an .mp4 video format:

With this one, the video size is small, it's mostly black. The audio
size dominates the file size.

    # Get a video from a video page's download link
    wget http://fastly.kastatic.org/KA-youtube-converted/-05OfTp6ZEE.mp4/-05OfTp6ZEE.mp4
    
    # Take the first 5 seconds - 93KB
    ffmpeg -t 5 -i -05OfTp6ZEE.mp4 5s.mp4
    
    # Video only - 10KB
    ffmpeg -i 5s.mp4 -map 0:0 5s_videoonly.mp4
    
    # Video only at smaller size - 6KB
    ffmpeg -i 5s.mp4 -filter:v scale=640:-1 -map 0:0 5s_videoonly_640.mp4 
    
    # Audio only - 84KB
    ffmpeg -i 5s.mp4 -map 0:1 5s_audioonly.mp4
    
    # Re-encode audio w/VBR quality levels 
    for vbr_level in 1 2 3 4 5; do ffmpeg -i 5s.mp4 -map 0:1 -vbr "$vbr_level" 5s_audioonly_vbr"$vbr_level".mp4; done
    # 1 -> 36KB
    # 2 -> 38KB
    # 3 -> 42KB
    # 4 -> 46KB
    # 5 -> 59KB
    
    # Re-encode audio w/32k bitrate - 23KB
    ffmpeg -i 5s.mp4 -map 0:1 -b:a 32k 5s_audioonly_32k.mp4
    
    # Re-encode audio w/16k bitrate - 13KB (sounds bad)
    ffmpeg -i 5s.mp4 -map 0:1 -b:a 16k 5s_audioonly_16k.mp4
    
    # Put it all together for a 640 width w/32k sound video file - 30KB
    ffmpeg -i 5s.mp4 -filter:v scale=640:-1 -b:a 32k 5sec_640_32k.mp4
    
    # w/16k sound - 20KB
    ffmpeg -i 5s.mp4 -filter:v scale=640:-1 -b:a 16k 5sec_640_16k.mp4


### Playing around w/another .mp4 video format:

With this one, the audio is pretty large, and the video is pretty large, too.

    # Get a video from a video page's download link
    wget http://fastly.kastatic.org/KA-youtube-converted/kpCJyQ2usJ4.mp4/kpCJyQ2usJ4.mp4
    
    # Take the first 5 seconds - 235KB
    ffmpeg -t 5 -i kpCJyQ2usJ4.mp4 5s.mp4
    
    # Video only - 164KB
    ffmpeg -i 5s.mp4 -map 0:0 5s_videoonly.mp4
    
    # Video only at smaller size - 47KB
    ffmpeg -i 5s.mp4 -filter:v scale=640:-1 -map 0:0 5s_videoonly_640.mp4 
    
    # Audio only - 63KB
    ffmpeg -i 5s.mp4 -map 0:1 5s_audioonly.mp4
    
    # Re-encode audio w/VBR quality levels 
    for vbr_level in 1 2 3 4 5; do ffmpeg -i 5s.mp4 -map 0:1 -vbr "$vbr_level" 5s_audioonly_vbr"$vbr_level".mp4; done
    # 1 -> 37KB
    # 2 -> 39KB
    # 3 -> 42KB
    # 4 -> 46KB
    # 5 -> 56KB
    
    # Re-encode audio w/32k bitrate - 23KB
    ffmpeg -i 5s.mp4 -map 0:1 -b:a 32k 5s_audioonly_32k.mp4
    
    # Re-encode audio w/16k bitrate - 12KB (sounds bad)
    ffmpeg -i 5s.mp4 -map 0:1 -b:a 16k 5s_audioonly_16k.mp4
    
    # Put it all together for a 640 width w/32k sound video file - 70KB
    ffmpeg -i 5s.mp4 -filter:v scale=640:-1 -b:a 32k 5sec_640_32k.mp4
    
    # w/16k sound - 60KB
    ffmpeg -i 5s.mp4 -filter:v scale=640:-1 -b:a 16k 5sec_640_16k.mp4
    
### Playing around with a streaming video format

Reads first 5 seconds (-t 5) from an m3u8 stream (-re -i ...), and
scales down to 640x??? to retain aspect ratio (-filter:v scale=640:-1)
and takes the streams 2 and 3 (the medium quality streams, in this
case), rather than the default 0 and 1 streams (-map 0:2 -map 0:3).

    # First 5s of medium quality stream - 99KB
    ffmpeg -t 5 -re -i http://fastly.kastatic.org/KA-youtube-converted/--62G62uoAk.m3u8/--62G62uoAk.m3u8 -filter:v scale=640:-1 -map 0:2 -map 0:3 test.mp4
    
    # Audio stream only for 5s of low quality stream - 63KB
    ffmpeg -t 5 -re -i http://fastly.kastatic.org/KA-youtube-converted/--62G62uoAk.m3u8/--62G62uoAk.m3u8 -map 0:4 test_audioonly.mp4
    
    # Video stream only for 5s of medium quality - 14KB
    ffmpeg -t 5 -re -i http://fastly.kastatic.org/KA-youtube-converted/--62G62uoAk.m3u8/--62G62uoAk.m3u8 -filter:v scale=640:-1 -map 0:2 test_videoonly.mp4
