# ITOT Express Professional Website

This repository contains a single-page professional portfolio website that highlights services, experience, and project case studies. The site is built with semantic HTML, responsive CSS, and a small JavaScript helper to keep the copyright year current.

## Structure

- `index.html` &mdash; main landing page for the portfolio
- `styles.css` &mdash; global styles, layout, and responsive rules
- `script.js` &mdash; lightweight enhancement to update the footer year automatically

## Customization checklist

1. Update personal details in `index.html`
   - Replace **Your Name**, title, and tagline in the header
   - Update stats, experience, projects, and testimonials to match your story
   - Swap contact links (email, LinkedIn, GitHub) with your actual URLs
2. Optional: adjust theme colors or typography in `styles.css`
3. Commit any content updates so the production site stays in sync

## Preview locally

There are two quick ways to see the site in action before deploying:

1. **Open the file directly** – double-click `index.html` (or drag it into a browser window) and the page will render immediately.
2. **Run a temporary local server** – this mimics how the files will behave in AWS and is useful when you start adding assets.

   ```bash
   python3 -m http.server 8000
   ```

   After the server starts, visit [http://localhost:8000](http://localhost:8000) in your browser. You can stop the server anytime with `Ctrl+C`.

## Deploy to Amazon S3 static hosting

You already have an S3 bucket provisioned. Follow these steps to deploy the site:

1. **Configure the bucket for website hosting (one time):**
   ```bash
   aws s3 website s3://<your-bucket-name>/ --index-document index.html --error-document index.html
   ```
2. **Set a public-read bucket policy (one time):**
   Replace `<your-bucket-arn>` with the ARN from the S3 console.
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "<your-bucket-arn>/*"
       }
     ]
   }
   ```
   Apply the policy via the S3 console or AWS CLI:
   ```bash
   aws s3api put-bucket-policy --bucket <your-bucket-name> --policy file://bucket-policy.json
   ```
3. **Upload the website files:**
   ```bash
   aws s3 sync . s3://<your-bucket-name>/ --exclude "*" --include "index.html" --include "styles.css" --include "script.js"
   ```
4. **Invalidate CloudFront (optional):** If the bucket is behind a CloudFront distribution, run an invalidation to serve the latest assets.

5. **Access the site:**
   - Use the S3 static website endpoint: `http://<your-bucket-name>.s3-website-<region>.amazonaws.com`
   - Or your custom domain if configured via Route 53 / CloudFront

## Ongoing updates

Whenever you change the content, repeat step 3 to sync updated files. Consider automating deployment through CI/CD for more complex setups.
