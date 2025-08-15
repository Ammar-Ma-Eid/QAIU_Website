import { Card, CardContent } from "@/components/ui/card"
import { Mail, MapPin, Phone } from 'lucide-react'
import { ContactForm } from '@/components/contact-form'

export default function ContactPage() {
  return (
    <div className="bg-secondary relative overflow-hidden">
      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter">GET IN TOUCH WITH US</h1>
          <p className="max-w-3xl mx-auto mt-4 text-lg text-muted-foreground">
            We are here to help you with any questions or inquiries you may have. Please feel free to reach out to us using the contact form below, and we will get back to you as soon as possible.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-center">
          <div className="flex flex-col items-center">
             <MapPin className="h-8 w-8 text-primary mb-3" />
             <h3 className="font-bold text-lg">Our Location</h3>
             <p className="text-muted-foreground">Al Alameen City, El Alamein, Marsa Matrouh Governorate 5060310</p>
          </div>
          <div className="flex flex-col items-center">
             <Phone className="h-8 w-8 text-primary mb-3" />
             <h3 className="font-bold text-lg">Phone Number</h3>
             <a href="tel:+2001062065198" className="text-muted-foreground hover:text-primary">(+20)01062065198</a>
          </div>
          <div className="flex flex-col items-center">
             <Mail className="h-8 w-8 text-primary mb-3" />
             <h3 className="font-bold text-lg">Email</h3>
             <a href="mailto:qaiu@aiu.edu.eg" className="text-muted-foreground hover:text-primary">qaiu@aiu.edu.eg</a>
          </div>
        </div>

        <Card className="max-w-2xl mx-auto mt-12 bg-card">
          <CardContent className="p-8">
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
