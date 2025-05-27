from ultralytics import YOLO
import cv2
import math

# Constants
CONFIDENCE_THRESHOLD = 70  # Minimum confidence level for displaying detections
MODEL_PATH = 'E:/Iaf mits project/front end/server/last.pt'  # Path to your YOLOv8 model

# Initialize webcam
cap = cv2.VideoCapture(0)  # 0 corresponds to the default webcam
if not cap.isOpened():
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
classnames = ['alpaca']

while True:
    ret, frame = cap.read()
    if not ret:
        print("Error: Failed to capture image.")
        break

    frame = cv2.resize(frame, (640, 480))  # Resize frame for consistency

    # Perform inference with YOLOv8
    results = model(frame, stream=True)

    # Process bounding boxes and display results
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
                    x1, y1, x2, y2 = box.xyxy[0]
                    x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)

                    # Draw bounding box and class label
                    cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 0, 255), 5)
                    cv2.putText(frame, f'{class_name} {confidence}%', (x1 + 8, y1 + 30),
                                cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)

            else:
                print(f"Warning: Detected class index {class_index} is out of bounds for classnames list")

    # Display the frame with detected objects
    cv2.imshow('Animal Detection', frame)

    # Press 'Esc' key to exit the loop
    if cv2.waitKey(1) & 0xFF == 27:
        break

# Release the webcam and close the window
cap.release()
cv2.destroyAllWindows()
print("Exiting program...")