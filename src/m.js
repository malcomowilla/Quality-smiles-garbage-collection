// "Version": "2012-10-17",
// "Statement": [
//     {
//         "Sid": "Statement1",
//         "Principal": "*",
//         "Effect": "Allow",
//         "Action": [
//             "s3:ListBucket",
//             "s3:GetObject",
//             "s3:PutObject",
//             "s3:DeleteObject",
//             "s3:PutObjectAcl",
//             "s3:PutBucketPolicy"
//         ],
//         "Resource": [
//             "arn:aws:s3:::quality-smiles-bucket",
//             "arn:aws:s3:::quality-smiles-bucket/*"
//         ]
//     }
// ]


// // quality-smiles-policy






// uploader = S3Uploader.new
// file = File.open('path/to/your/image.png') # Replace with your image file
// bucket = 'your-bucket-name'
// key = 'uploads/image.png' # Path where you want to store the image in the bucket  => must i specify where in the aws bucket i want to store the image coming from rails