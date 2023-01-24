import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class UtilService{
    
     makeId(length = 5): string {
        var txt = ''
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        for (var i = 0; i < length; i++) {
            txt += possible.charAt(Math.floor(Math.random() * possible.length))
        }
        return txt
    }
    
    generateEmailContent():{subject:string,body:string} {
          
        // Possible email subjects
        const subjects = [
            "Meeting schedule for next week",
            "Reminder: deadline for project proposal",
            "Invitation to virtual networking event",
            "Follow-up on our previous conversation",
            "Happy birthday!",
            "New feature launch - don't miss out!",
            "Important update on our company's policies",
            "Join our webinar on the latest industry trends",
            "Feedback needed on the new design",
            "Invoice for your recent purchase",
            "Congratulations on your new job!",
            "New product announcement",
            "Welcome to our team!",
            "Your account has been suspended",
            "Registration for our upcoming event",
            "Security alert: please update your password",
            "Special offer for our loyal customers",
            "Thank you for your recent order",
            "Upcoming maintenance on our website",
            "Webinar recording now available",
            "Weekly newsletter - don't miss out!",
            "Your subscription has been renewed",
            "Reminder: payment due",
            "New blog post - check it out!",
            "Invitation to our annual company picnic",
            "Important announcement regarding COVID-19",
            "Your account has been compromised - urgent action required",
            "New job opening - apply now!",
            "Your application has been received"
            ]
        
          // Possible email bodies
          const bodies = [
            "Hello, I would like to schedule a meeting for next week to discuss the progress of our project. Please let me know your availability.",
            "Just a reminder that the deadline for submitting project proposals is approaching. Please make sure to submit yours on time.",
            "You are cordially invited to a virtual networking event next Friday. It's a great opportunity to meet and connect with other professionals in our field.",
            "I hope this email finds you well. I just wanted to follow up on our previous conversation and see if there's any update on the matter.",
            "Wishing you a very happy birthday! I hope you have a fantastic day and a year filled with happiness and success.",
            "We are excited to announce the launch of a new feature on our platform. Don't miss out on this exclusive opportunity.",
            "We have recently updated our company's policies. Please take a moment to review them and let us know if you have any questions.",
            "Join us for a webinar on the latest industry trends. Learn from experts and stay ahead of the game.",
            "We would love to hear your thoughts on the new design. Please take a moment to provide your feedback.",
            "Please find attached the invoice for your recent purchase. Let us know if you have any questions.",
            "We are thrilled to hear about your new job! We wish you all the best in your new position.",
            "We are excited to announce the launch of a new product. Stay tuned for more details.",
            "We are delighted to have you on our team! We look forward to working together.",
            "We regret to inform you that your account has been suspended. Please contact us to resolve this matter.",
            "Registration for our upcoming event is now open. Don't miss out on this opportunity!"
                  ]
        
          // Randomly select a subject and body
          const idx = Math.floor(Math.random() * subjects.length)
          return { subject:subjects[idx], body: bodies[idx%bodies.length] }
        }
    
     makeName():string {
        const names = ['Roei Hillel', 'Ido Kagan', 'Tal Itzhakov', 'Bar Gilad', 'Yossi Ashur','Moshe Abargel','Ben Cohen', 'Adi Suissa', 'Chen Movshovitz', 'Adva Catz', 'Liel Bendor', 'Atalia Zahavy', 'Daniel Peretz']
        return names[Math.floor(Math.random() * names.length)]
    }

    randomTimestamp(months=4) :number{
        // Get current timestamp
        const currentTimestamp = Date.now()
      
        // Get timestamp x months ago
        const monthsAgo = new Date()
        monthsAgo.setMonth(monthsAgo.getMonth() - months)
        const monthsAgoTimestamp = monthsAgo.getTime()
      
        // Generate a random number between the timestamps of x months ago and now
        const randomTimestamp = monthsAgoTimestamp + Math.random() * (currentTimestamp - monthsAgoTimestamp)
      
        // Return the random timestamp
        return randomTimestamp
      }

}