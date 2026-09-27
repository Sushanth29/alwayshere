package main

import (
	"bytes"
	"fmt"
	"html/template"
	"net/http"
	"net/smtp"
	"os"
	"path/filepath"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

type Message struct {
	Category string    `json:"category" binding:"required"`
	Body     string    `json:"body" binding:"required"`
	Title    string    `json:"title"`
	Created  time.Time `json:"created"`
}

func sendEmail(msg Message) error {
	smtpHost := os.Getenv("SMTP_HOST")
	smtpPort := os.Getenv("SMTP_PORT")
	senderEmail := os.Getenv("SENDER_EMAIL")
	senderPassword := os.Getenv("SENDER_PASSWORD")
	recipientEmail := os.Getenv("RECIPIENT_EMAIL")

	if smtpHost == "" {
		fmt.Printf("[EMAIL] To: %s\nSubject: 💌 %s\n\n%s\n\n---\n", recipientEmail, msg.Title, msg.Body)
		return nil
	}

	subject := fmt.Sprintf("💌 %s", msg.Title)
	noteTemplate, err := template.New("note").Parse(`<!doctype html><html><body style="margin:0;padding:32px;background:#fff9f6;font-family:Arial,sans-serif;color:#2d1d1e"><h1 style="margin:0 0 24px;font-size:28px">you got a note from here</h1><div style="padding:20px 22px;background:#fff0f2;border-left:4px solid #d48e8a;border-radius:8px;font-size:17px;line-height:1.7;white-space:pre-wrap">{{.}}</div></body></html>`)
	if err != nil {
		return err
	}
	var htmlBody bytes.Buffer
	if err := noteTemplate.Execute(&htmlBody, msg.Body); err != nil {
		return err
	}

	auth := smtp.PlainAuth("", senderEmail, senderPassword, smtpHost)
	emailBody := fmt.Sprintf("Subject: %s\r\nMIME-Version: 1.0\r\nContent-Type: text/html; charset=UTF-8\r\n\r\n%s", subject, htmlBody.String())

	return smtp.SendMail(
		smtpHost+":"+smtpPort,
		auth,
		senderEmail,
		[]string{recipientEmail},
		[]byte(emailBody),
	)
}

func main() {
	_ = godotenv.Load()

	r := gin.Default()

	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"ok": true})
	})

	r.POST("/api/messages", func(c *gin.Context) {
		var msg Message
		if err := c.ShouldBindJSON(&msg); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid message"})
			return
		}
		msg.Created = time.Now()

		if err := sendEmail(msg); err != nil {
			fmt.Printf("Email error: %v\n", err)
		}

		c.JSON(http.StatusAccepted, gin.H{"status": "received"})
	})

	if staticDir := os.Getenv("STATIC_DIR"); staticDir != "" {
		r.Static("/assets", filepath.Join(staticDir, "assets"))
		r.StaticFile("/", filepath.Join(staticDir, "index.html"))
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	r.Run(":" + port)
}
