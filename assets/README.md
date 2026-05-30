# Assets Folder

## Profile Image Instructions

**Current Status:** Using `profile-placeholder.svg` (temporary gradient placeholder)

### To Add Your Professional Photo:

1. **Prepare your photo:**
   - **Recommended size:** 800x800 pixels (or larger, square aspect ratio)
   - **Format:** JPG, PNG, or WebP
   - **Quality:** High resolution, professional quality
   - **Background:** Plain or softly blurred
   - **Lighting:** Good, even lighting on face
   - **Framing:** Face clearly visible, professional appearance

2. **Replace the placeholder:**
   - Save your photo as `profile.jpg` (or keep your preferred format)
   - Place it in this `/assets/` folder
   - Update the image source in `index.html` line ~70:
     ```html
     <img src="assets/profile.jpg" alt="ShivaPrasath K - Software Developer" class="profile-image">
     ```

3. **The image will automatically display with:**
   - Animated gradient border (purple → cyan → pink)
   - Glassmorphism background card
   - Smooth floating animation
   - Scale effect on hover
   - Responsive sizing (350px desktop, 280px tablet, 220px mobile)

## Quick Options for Placeholder

If you don't have a photo ready, you can temporarily use:
- [UI Faces](https://uifaces.co/) - Free face avatars
- [This Person Does Not Exist](https://thispersondoesnotexist.com/) - AI-generated faces
- [Unsplash](https://unsplash.com/s/photos/professional-headshot) - Professional photos

## Need Help?

The current placeholder (gradient with user icon) will display until you add your actual photo. This ensures your portfolio looks complete while you prepare your professional headshot!
