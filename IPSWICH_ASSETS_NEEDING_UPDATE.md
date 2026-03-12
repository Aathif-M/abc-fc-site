# Ipswich Town FC Asset Checklist

I have expanded the site architecture to a full "Club Hub". Below is the complete list of images and videos needed to finish the visual revamp. Place them in `src/assets/` (or update the URLs in the components directly if using external links).

## 1. Core Branding & Interaction
| Filename | Description | Used In |
| :--- | :--- | :--- |
| **`ipswich-ball.svg`** | High-quality football SVG or crest | Interactive floating ball |
| **`ipswich-goal.svg`** | Goal post or net SVG graphic | Goal / Partner sections |

## 2. Hero Section (Carousel)
*Location: `src/components/Hero.jsx`*
| Slide | Description | Story Context |
| :--- | :--- | :--- |
| **Slide 1** | Match action shot or stadium photo | Match Preview: Town v Liverpool |
| **Slide 2** | Portrait of Kieran McKenna | McKenna Extends Contract |
| **Slide 3** | Player in the new away kit | New Away Kit Revealed |

## 3. Town TV (Media Grid)
*Location: `src/components/MediaGrid.jsx`*
| Card | Description | Context |
| :--- | :--- | :--- |
| **Thumb 1** | In-game action shot (Town vs Sunderland) | Extended Highlights |
| **Thumb 2** | Manager interview close-up | McKenna Interview |
| **Thumb 3** | Players at training ground | Behind the Scenes |
| **Thumb 4** | Omari Hutchinson action shot | Player Profile |

## 4. Headlines (Latest News Matrix)
*Location: `src/components/LatestNews.jsx`*
| Size | Description | Context |
| :--- | :--- | :--- |
| **Featured** | High-quality first-team wide shot | McKenna Plans for PL |
| **Small 1** | Training ground facilities | New Facilities |
| **Small 2** | Academy/U21 team action | U21s Victory |
| **Small 3** | Fans or match tickets | Ticket Information |

## 5. Commercial Partners
*Location: `src/components/Partner.jsx`*
| Item | Description | Context |
| :--- | :--- | :--- |
| **Principal Partner**| EasyMarkets logo (Transparent SVG/PNG preferred) | Principal Card |
| **Marquee Logos** | 5-8 Sponsor logos (white/monochrome preferred) | Scrolling Marquee |

## Instructions
1. Find high-quality images.
2. For local files, save them in `src/assets/` and import them at the top of the relevant components.
3. For the **Principal Partner**, look for the HTML comment `<!-- INSERT PRINCIPAL PARTNER LINK HERE -->` in `Partner.jsx` to swap the link and image.
