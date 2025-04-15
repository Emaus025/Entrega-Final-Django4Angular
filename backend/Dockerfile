FROM python:3.9

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt
RUN pip install Pillow  # Add this line

COPY . .

CMD ["./start.sh"]