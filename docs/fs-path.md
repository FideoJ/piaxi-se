url-prefix: https://piaxi-filer.resetbypear.com

videos/
  <video_id>/
    original.mp4
    silent.mp4
    poster.jpg
    subtitle.srt

works/
  <works_id>/
    voice.mp3
    subtitle.srt
    face.jpg
    product.mp4

bgms/
  <bgm_id>/
    bgm.mp3

roles/
  <role_id>/
    role.jpg

// 例如前端要拿素材视频3的字幕，只需要请求 https://piaxi-filer.resetbypear.com/videos/3/subtitle.srt
// 若要上传用户作品5的音频，上传到 https://piaxi-filer.resetbypear.com/works/5/voice.mp3 即可