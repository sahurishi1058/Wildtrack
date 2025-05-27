from flask import Flask, Response, jsonify
from flask_cors import CORS
import cv2
from ultralytics import YOLO
import math
import time
# import torch
# import numpy as np
# import pandas as pd
# import supervision as sv

# Constants
CONFIDENCE_THRESHOLD = 70  # Minimum confidence level for displaying detections
MODEL_PATH = 'africa.pt'  # Path to YOLO model
LOG_FILE = "detection_log.txt"  # File to store detection logs

app=Flask(__name__)
CORS(app)
camera1=cv2.VideoCapture(0)
camera2=cv2.VideoCapture(1)
camera3=cv2.VideoCapture(2)
camera4=cv2.VideoCapture(3)
camera5=cv2.VideoCapture(4)
camera6=cv2.VideoCapture(5)


if not camera1.isOpened():
    print("Error: Could not open webcam.")
    exit()

# Load YOLOv8 model
try:
    model = YOLO(MODEL_PATH)
    print("YOLO model loaded successfully!")
except Exception as e:
    print(f"Error loading model: {e}")
    exit()

# Class names for detection (ensure this matches the dataset the model was trained on)
classnames = ['buffalo','elephant','rhino','zebra']



def generate_frames(cam):
    camera = cam
    with open(LOG_FILE, "a") as log_file:
        log_file.write("=== Animal Detection Log ===\n")

        while True:
            
            success,frame=camera.read()      # read the camera frame
            if not success:
                break
            else:
                # frame = cv2.resize(frame, (640, 480))  # Resize frame for consistency
                frame = cv2.resize(frame, (330, 277))  # Resize frame for consistency

                # Perform inference with YOLOv8
                results = model(frame, stream=True)
                result1=model.track(source=frame,stream=True,show=True,tracker="bytetrack.yaml")

                detected_animals = []  # Keep track of detected animals

                # Process bounding boxes and display results
                for j in result1:
                    print(j.boxes.id)

                for info in results:
                    boxes = info.boxes
                    for box in boxes:
                        confidence = box.conf[0]
                        confidence = math.ceil(confidence * 100)
                        class_index = int(box.cls[0])

                        # Debug output to help diagnose the issue
                        print(f"Detected Object Index: {class_index}, Confidence: {confidence}%")

                        # Ensure class_index is valid
                        if class_index < len(classnames):
                            class_name = classnames[class_index]
                            print(f"Class Name: {class_name}")

                            # Only process boxes with confidence above the threshold
                            if confidence > CONFIDENCE_THRESHOLD:
                                detected_animals.append(class_name)  # Add the detected animal to the list

                                x1, y1, x2, y2 = box.xyxy[0]
                                x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)

                                # Draw bounding box and class label
                                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 0, 255), 5)
                                cv2.putText(frame, f'{class_name} {confidence}%', (x1 + 8, y1 + 30),
                                            cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)
                        else:
                            print(f"Warning: Detected class index {class_index} is out of bounds for classnames list")
                        

                # Display the frame with detected objects
                # cv2.imshow('Animal Detection', frame)

                # Press 'Esc' key to exit the loop
                # if cv2.waitKey(1) & 0xFF == 27:
                #     break

                # If any animals were detected, log them
                if detected_animals:
                    timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
                    log_entry = f"{timestamp}: Detected animals: {', '.join(detected_animals)}\n"
                    print(log_entry.strip())  # Print to console
                    log_file.write(log_entry)  # Write to log file
                    log_file.flush()  # Ensure the log file is updated immediately
                    cv2.putText(frame, "Animal Detected!", (20, 50), cv2.FONT_HERSHEY_SIMPLEX, 1.5, (0, 255, 0), 3)

                

                ret,buffer=cv2.imencode('.jpg',frame)
                frame=buffer.tobytes()


                yield(b'--frame\r\n'
                    b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
                
        
def logg():
    with open("./detection_log.txt") as logfile:
        logline = logfile.readlines()
    
    return logline


@app.route('/logline', methods=['GET'])
def index():
    return jsonify({
        'message': logg()
    })

@app.route('/video/item1')
def video():
    return Response(generate_frames(camera1),mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/video/item2')
def video2():
    return Response(generate_frames(camera2),mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/video/item3')
def video3():
    return Response(generate_frames(camera3),mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/video/item4')
def video4():
    return Response(generate_frames(camera4),mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/video/item5')
def video5():
    return Response(generate_frames(camera5),mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/video/item6')
def video6():
    return Response(generate_frames(camera6),mimetype='multipart/x-mixed-replace; boundary=frame')


if __name__=="__main__":
    app.run(debug=True, port=8080)
