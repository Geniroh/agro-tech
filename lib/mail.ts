var nodemailer = require("nodemailer");

export async function sendMail(
  subject: string,
  toEmail: string,
  otpText: string
) {
  await new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PW,
      },
    });
    var mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: toEmail,
      subject: subject,
      html: otpText,
    };

    transporter.sendMail(mailOptions, function (error: any) {
      if (error) {
        throw new Error(error);
      } else {
        console.log("Email Sent");
        return true;
      }
    });
  });
}

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/auth/new-verification?token=${token}`;

  await sendMail(
    "Confirm your email",
    email,
    // `<p>Click <a href="${confirmLink}">here</a> to confirm email. </p>`
    `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!-- <link rel="preconnect" href="https://fonts.googleapis.com"> -->
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap" rel="stylesheet">
        <title>StavMia Reset Password</title>
    </head>
    <body style="padding: 40px; 
        color: #344054; 
        font-family: Inter; 
        margin: 0 auto; 
        max-width: 570px;
        font-size: 16px;
        background-color: #fff;">
        
        <div >
            <div class="logo" style="display: flex;
            align-items: center;
            gap: 10px;
            font-size: 24px;
            font-weight: 600; flex-direction:column;">
                <img src="https://stavmia-bucket.nyc3.cdn.digitaloceanspaces.com/StavmiaLogo.png" alt="" style="height: 50px; width: 100px">
                <div></div>
            </div>
    
            <div class="info" style="padding-top: 44px;
            padding-bottom: 44px;">
                <p>Dear ${email},</p>
                <p>Click <a href="${confirmLink}">here</a> to confirm email. </p>
      
                <div>
                    Regards,<br/>Pan African Society of Agricultural Engineering (PASAE)
                </div>
            </div>
            
    
        </div>
    
        <script>
            // JavaScript code to set the current year
            const currentYear = new Date().getFullYear();
            document.getElementById('currentYear').innerText = currentYear;
          </script>
        
        
    </body>
    </html>`
  );
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/auth/new-password?token=${token}`;

  await sendMail(
    "Reset your password",
    email,
    `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!-- <link rel="preconnect" href="https://fonts.googleapis.com"> -->
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap" rel="stylesheet">
        <title>StavMia Reset Password</title>
    </head>
    <body style="padding: 40px; 
        color: #344054; 
        font-family: Inter; 
        margin: 0 auto; 
        max-width: 570px;
        font-size: 16px;
        background-color: #fff;">
        
        <div >
            <div class="logo" style="display: flex;
            align-items: center;
            gap: 10px;
            font-size: 24px;
            font-weight: 600; flex-direction:column;">
                <img src="https://stavmia-bucket.nyc3.cdn.digitaloceanspaces.com/StavmiaLogo.png" alt="" style="height: 50px; width: 100px">
                <div></div>
            </div>
    
            <div class="info" style="padding-top: 44px;
            padding-bottom: 44px;">
                <p>Dear ${email},</p>
                <p>Click <a href="${resetLink}">here</a> to reset password. </p>
      
                <div>
                    Regards,<br/>Pan African Society of Agricultural Engineering (PASAE)
                </div>
            </div>
            
    
        </div>
    
        <script>
            // JavaScript code to set the current year
            const currentYear = new Date().getFullYear();
            document.getElementById('currentYear').innerText = currentYear;
          </script>
        
        
    </body>
    </html>`
  );
};

export const sendUploadRequest = async (email: string, name: string) => {
  await sendMail(
    "Innovation Uploaded",
    email,
    `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- <link rel="preconnect" href="https://fonts.googleapis.com"> -->
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap" rel="stylesheet">
    <title>StavMia Innovation Upload</title>
</head>
<body style="padding: 40px; 
    color: #344054; 
    font-family: Inter; 
    margin: 0 auto; 
    max-width: 570px;
    font-size: 16px;
    background-color: #fff;">
    
    <div >
        <div class="logo" style="display: flex;
        align-items: center;
        gap: 10px;
        font-size: 24px;
        font-weight: 600; flex-direction:column;">
            <img src="https://stavmia-bucket.nyc3.cdn.digitaloceanspaces.com/StavmiaLogo.png" alt="" style="height: 50px; width: 100px">
            <div>Innovation Uploaded</div>
        </div>

        <div class="info" style="padding-top: 44px;
        padding-bottom: 44px;">
            <p>Dear ${name},</p>
            <p>Your innovation has been successfully uploaded to STAVMiA. Thank you for your contribution. Check your profile in 10 days to see if your upload is approved.</p>
            <p>If you would like to raise any concerns about your upload in the future, contact the admin..</p>
  
            <div>
                Regards,<br/>Pan African Society of Agricultural Engineering (PASAE)
            </div>
        </div>
        

    </div>

    <script>
        // JavaScript code to set the current year
        const currentYear = new Date().getFullYear();
        document.getElementById('currentYear').innerText = currentYear;
      </script>
    
    
</body>
</html>`
  );
};

export const sendUploadAlert = async (email: string, name: string) => {
  await sendMail(
    "Innovation Uploaded",
    email,
    `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- <link rel="preconnect" href="https://fonts.googleapis.com"> -->
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap" rel="stylesheet">
    <title>StavMia Innovation Upload</title>
</head>
<body style="padding: 40px; 
    color: #344054; 
    font-family: Inter; 
    margin: 0 auto; 
    max-width: 570px;
    font-size: 16px;
    background-color: #fff;">
    
    <div >
        <div class="logo" style="display: flex;
        align-items: center;
        gap: 10px;
        font-size: 24px;
        font-weight: 600; flex-direction:column;">
            <img src="https://stavmia-bucket.nyc3.cdn.digitaloceanspaces.com/StavmiaLogo.png" alt="" style="height: 50px; width: 100px">
            <div>Innovation Alert</div>
        </div>

        <div class="info" style="padding-top: 44px;
        padding-bottom: 44px;">
            <p>Hi Admin,</p>
            <p>There is an uploaded innovation from ${name}</p>
        </div>

        <a href="${process.env.NEXT_PUBLIC_ADMIN_URL}">
            <button style="background-color: #53a350;
            border-radius: 8px;
            border: 1px solid  #53a350;
            box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
            padding: 10px 18px;
            color: #fff;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;">Log in to approve</button>
        </a>
        

    </div>

    <script>
        // JavaScript code to set the current year
        const currentYear = new Date().getFullYear();
        document.getElementById('currentYear').innerText = currentYear;
      </script>
    
    
</body>
</html>`
  );
};

export const sendEditEmail = async (
  email: string,
  title: string,
  message: string
) => {
  await sendMail(
    "Edit Alert",
    process.env.NODEMAILER_EMAIL || "irochibuzor@gmail.com",
    `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- <link rel="preconnect" href="https://fonts.googleapis.com"> -->
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap" rel="stylesheet">
    <title>StavMia Innovation Upload</title>
</head>
<body style="padding: 40px; 
    color: #344054; 
    font-family: Inter; 
    margin: 0 auto; 
    max-width: 570px;
    font-size: 16px;
    background-color: #fff;">
    
    <div >
        <div class="logo" style="display: flex;
        align-items: center;
        gap: 10px;
        font-size: 24px;
        font-weight: 600; flex-direction:column;">
            <img src="https://stavmia-bucket.nyc3.cdn.digitaloceanspaces.com/StavmiaLogo.png" alt="" style="height: 50px; width: 100px">
        </div>
         <div>Edit Alert</div>

        <div class="info" style="padding-top: 44px;
        padding-bottom: 44px;">
            <p>Hi Admin,</p>
            <p>There is an edit request from ${email}</p>
            <p>Innovation Name ${title}</p>
            <p>Message: ${message}</p>
        </div>

        <a href="${process.env.NEXT_PUBLIC_ADMIN_URL}">
            <button style="background-color: #53a350;
            border-radius: 8px;
            border: 1px solid  #53a350;
            box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
            padding: 10px 18px;
            color: #fff;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;">Log in to approve</button>
        </a>
        

    </div>

    <script>
        // JavaScript code to set the current year
        const currentYear = new Date().getFullYear();
        document.getElementById('currentYear').innerText = currentYear;
      </script>
    
    
</body>
</html>`
  );
};
