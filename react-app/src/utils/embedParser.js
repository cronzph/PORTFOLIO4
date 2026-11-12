/**
 * Detects video platform links and returns embed info.
 * { platform, embedId, embedUrl, aspectRatio } or null.
 */
export function parseEmbedUrl(url) {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();

  const ytWatch = trimmed.match(/(?:youtube\.com\/watch\?.*v=)([\w-]{11})/);
  if (ytWatch) {
    return {
      platform: 'youtube',
      embedId: ytWatch[1],
      embedUrl: `https://www.youtube.com/embed/${ytWatch[1]}`,
      aspectRatio: '16/9',
    };
  }

  const ytShort = trimmed.match(/youtube\.com\/shorts\/([\w-]{11})/);
  if (ytShort) {
    return {
      platform: 'youtube',
      embedId: ytShort[1],
      embedUrl: `https://www.youtube.com/embed/${ytShort[1]}`,
      aspectRatio: '9/16',
    };
  }

  const ytBe = trimmed.match(/youtu\.be\/([\w-]{11})/);
  if (ytBe) {
    return {
      platform: 'youtube',
      embedId: ytBe[1],
      embedUrl: `https://www.youtube.com/embed/${ytBe[1]}`,
      aspectRatio: '16/9',
    };
  }

  const tt = trimmed.match(/tiktok\.com\/@[\w.-]+\/video\/(\d+)/);
  if (tt) {
    return {
      platform: 'tiktok',
      embedId: tt[1],
      embedUrl: `https://www.tiktok.com/embed/v2/${tt[1]}`,
      aspectRatio: '9/16',
    };
  }

  const ttShort = trimmed.match(/vt\.tiktok\.com\/([\w-]+)/);
  if (ttShort) {
    return { platform: 'tiktok', embedId: null, embedUrl: null, aspectRatio: '9/16' };
  }

  const fbReel = trimmed.match(/facebook\.com\/reel\/(\d+)/);
  if (fbReel) {
    return {
      platform: 'facebook',
      embedId: fbReel[1],
      embedUrl: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(trimmed)}&show_text=false`,
      aspectRatio: '9/16',
    };
  }

  const fbWatch = trimmed.match(/facebook\.com\/watch\/?\?v=(\d+)/);
  if (fbWatch) {
    return {
      platform: 'facebook',
      embedId: fbWatch[1],
      embedUrl: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(trimmed)}&show_text=false`,
      aspectRatio: '16/9',
    };
  }

  const fbShort = trimmed.match(/fb\.watch\/([\w-]+)/);
  if (fbShort) {
    return {
      platform: 'facebook',
      embedId: fbShort[1],
      embedUrl: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(trimmed)}&show_text=false`,
      aspectRatio: '9/16',
    };
  }

  const igReel = trimmed.match(/instagram\.com\/reel\/([\w-]+)/);
  if (igReel) {
    return {
      platform: 'instagram',
      embedId: igReel[1],
      embedUrl: `https://www.instagram.com/reel/${igReel[1]}/embed`,
      aspectRatio: '9/16',
    };
  }

  const igPost = trimmed.match(/instagram\.com\/p\/([\w-]+)/);
  if (igPost) {
    return {
      platform: 'instagram',
      embedId: igPost[1],
      embedUrl: `https://www.instagram.com/p/${igPost[1]}/embed`,
      aspectRatio: '1/1',
    };
  }

  return null;
}

/**
 * Splits content into text and embed segments. A line that is only a supported
 * video URL becomes an embed; everything else stays as text.
 */
export function parseContentWithEmbeds(content) {
  if (!content) return [{ type: 'text', content: '' }];

  const lines = content.split('\n');
  const segments = [];
  let buffer = [];

  const flush = () => {
    if (buffer.length) {
      segments.push({ type: 'text', content: buffer.join('\n') });
      buffer = [];
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (/^https?:\/\/\S+$/.test(trimmed)) {
      const embed = parseEmbedUrl(trimmed);
      if (embed) {
        flush();
        segments.push({ type: 'embed', embed, originalUrl: trimmed });
        continue;
      }
    }

    buffer.push(line);
  }

  flush();
  return segments;
}
